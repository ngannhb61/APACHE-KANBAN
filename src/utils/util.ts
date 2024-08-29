function getUrlParams(url: string): any[] {
  return url
    .slice(url.indexOf('?') + 1)
    .split('&')
    .map((param) => param.split('='))
    .map(([key, value]) => ({
      key,
      value,
    }));
}

function getUrlParam(url: string, key: string): string {
  return getUrlParams(url).find((el) => el.key === key)?.value;
}

export { getUrlParams, getUrlParam };
