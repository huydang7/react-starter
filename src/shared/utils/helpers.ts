export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
};

export const enumToArray = (enumObject: any) => {
  return Object.keys(enumObject).map((key) => enumObject[key]);
};
