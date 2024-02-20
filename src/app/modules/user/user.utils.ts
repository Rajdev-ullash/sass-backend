import prisma from '../../../shared/prisma';

// Shopper ID
export const findLastShopperId = async (): Promise<string | undefined> => {
  const lastShopper = await prisma.shopper.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return lastShopper?.id ? lastShopper.id.substring(4) : undefined;
};

export const generateShopperId = async (): Promise<string> => {
  const currentId =
    (await findLastShopperId()) || (0).toString().padStart(4, '0'); //00000
  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Take only the last two digits
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based

  const currentData = {
    year: currentYear.toString(),
    code: currentMonth,
  };

  incrementedId = `${currentData.year}${currentData.code}${incrementedId}`;

  return incrementedId;
};
