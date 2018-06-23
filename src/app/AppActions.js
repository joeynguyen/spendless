export const STORE_NEXT_ROUTE_PATH = 'STORE_NEXT_ROUTE_PATH';

export function storeNextRoutePath(nextRouthPath) {
  return {
    data: nextRouthPath,
    type: STORE_NEXT_ROUTE_PATH,
  };
}
