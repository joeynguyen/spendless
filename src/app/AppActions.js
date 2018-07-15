export const STORE_NEXT_ROUTE_PATH = 'STORE_NEXT_ROUTE_PATH';
export const SELECT_ACTIVE_MONTH = 'SELECT_ACTIVE_MONTH';

export function storeNextRoutePath(nextRouthPath) {
  return {
    data: nextRouthPath,
    type: STORE_NEXT_ROUTE_PATH,
  };
}

export function selectActiveMonth(month) {
  return {
    data: month,
    type: SELECT_ACTIVE_MONTH,
  };
}
