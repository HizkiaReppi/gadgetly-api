export const generateSlug = (data) => {
  if (typeof data !== 'string') {
    return new Error('Data tidak valid');
  }

  return data
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};
