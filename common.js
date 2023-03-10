/**
 * json object to string
 * @returns
 */
export const getParamsToQuery = (params) => {
  let query = "";
  if (params) {
    query = "?";

    Object.entries(params).forEach(([key, value], index) => {
      if (index > 0) {
        query += `&`;
      }
      query += `${key}=${value}`;
    });
  }
  return query;
};
