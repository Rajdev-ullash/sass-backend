// Your service code here

// Your service code here
// Your service code here
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssignOrderToDP, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import moment from 'moment';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { assignOrderToDPSearchableFields } from './assignOrderToDP.constants';
import {
  IAssignOrderToDPFilterRequest,
  ICombinedFilterRequest,
} from './assignOrderToDP.interfaces';

const insertIntoDB = async (
  data: AssignOrderToDP
): Promise<AssignOrderToDP> => {
  data.deliveryTimeCommitted = Number(data.deliveryTimeCommitted);

  const checkOrder = await prisma.order.findUnique({
    where: {
      id: data.orderId,
    },
  });
  if (!checkOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Id not found');
  }
  const checkEmployee = await prisma.employee.findUnique({
    where: {
      id: data.employeeId,
    },
  });
  if (checkEmployee) {
    if (checkEmployee.types !== 'DP') {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Employee types not a delivery person'
      );
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Id not found');
  }
  const result = await prisma.assignOrderToDP.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IAssignOrderToDPFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AssignOrderToDP[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: assignOrderToDPSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.AssignOrderToDPWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.assignOrderToDP.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.assignOrderToDP.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<AssignOrderToDP | null> => {
  const result = await prisma.assignOrderToDP.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<any>
): Promise<AssignOrderToDP> => {
  payload.deliveryTimeCommitted = Number(payload.deliveryTimeCommitted);
  const findData = await prisma.assignOrderToDP.findUnique({
    where: {
      id: id,
    },
  });
  if (payload.status && payload.status === 'DELIVERED') {
    return await prisma.$transaction(async transactionClient => {
      const result = await transactionClient.assignOrderToDP.update({
        where: {
          id,
        },
        data: {
          orderId: payload.orderId || findData?.orderId,
          employeeId: payload.employeeId || findData?.employeeId,
          deliveryTimeCommitted:
            payload?.deliveryTimeCommitted || findData?.deliveryTimeCommitted,
          deliveryCompletionTime: '0',
        },
      });
      let deliveryCompletionTime: string | undefined;
      if (findData?.createdAt && result?.updatedAt) {
        const duration = moment.duration(
          result?.updatedAt.getTime() - findData.createdAt.getTime()
        );
        deliveryCompletionTime = `${Math.round(
          duration.asMinutes()
        )} min ${Math.round(duration.asSeconds())} seconds`;
      }
      console.log(deliveryCompletionTime);
      const results = await transactionClient.assignOrderToDP.update({
        where: {
          id,
        },
        data: {
          orderId: payload.orderId || findData?.orderId,
          employeeId: payload.employeeId || findData?.employeeId,
          deliveryTimeCommitted:
            payload?.deliveryTimeCommitted || findData?.deliveryTimeCommitted,
          deliveryCompletionTime: deliveryCompletionTime,
        },
      });

      const updateOrder = await transactionClient.order.update({
        where: {
          id: payload.orderId,
        },
        data: {
          status: payload.status,
        },
      });

      if (!updateOrder) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update order');
      }

      return results;
    });
  }
  const result = await prisma.assignOrderToDP.update({
    where: {
      id,
    },
    data: {
      orderId: payload.orderId || findData?.orderId,
      employeeId: payload.employeeId || findData?.employeeId,
      deliveryTimeCommitted:
        payload?.deliveryTimeCommitted || findData?.deliveryTimeCommitted,
      deliveryCompletionTime: '0',
    },
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<AssignOrderToDP> => {
  const result = await prisma.assignOrderToDP.delete({
    where: {
      id,
    },
  });
  return result;
};

const getAllInfoFromDB = async (
  filters: ICombinedFilterRequest, // Combined filter interface
  options: IPaginationOptions
): Promise<IGenericResponse<any[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, userId, status, isCashOnDelivery, ...filterData } =
    filters;
  const andConditions: string | any[] = [];

  // ... (search and filter logic similar to the previous versions)

  const whereConditions: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    include: {
      assignOrderToDPs: {
        select: {
          employeeId: true,
          deliveryTimeCommitted: true,
          deliveryCompletionTime: true,
          // ...other fields you need
        },
      }, // Include the related AssignOrderToDP record
      user: {
        include: {
          buyer: true, // Include buyer details for customer information
        },
      },
    },
  });

  const total = await prisma.order.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result.map(item => ({
      orderId: item.id,
      customerName: item.user?.buyer?.username ?? '',
      address: item.user?.buyer?.address ?? '',
      phoneNumber: item.user?.buyer?.mobileNumber ?? '',
      orderStatus: item.status,
      dpId: item.assignOrderToDPs?.[0]?.employeeId ?? '', // Handle potential null values
      deliveryTimeCommitted:
        item.assignOrderToDPs?.[0]?.deliveryTimeCommitted ?? 0,
      deliveryCompletionTime:
        item.assignOrderToDPs?.[0]?.deliveryCompletionTime ?? 0,
      // Add other desired fields from Order and AssignOrderToDP models
    })),
  };
};

export const AssignOrderToDPService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  getAllInfoFromDB,
};
