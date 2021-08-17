const apiPath = 'http://data.fixer.io/api/';

const proxyUrl = (key, param) => {
  const url = new URL(apiPath);
  let newUrl = new URL(`${param}`, url);
  newUrl.searchParams.set('access_key', `${key}`);
  return newUrl.toString();
};

export default proxyUrl;

