export default function(state, action) {
  switch (action.type) {
    case 'redux-form/CHANGE':
      if (action.field === 'accountType' && action.form === 'AddAccount') {
        const newState = Object.assign({}, state);
        // reset accountCompany value when changing accountType value
        // since both bank and credit cards use accountCompany
        newState.accountCompany.value = '';
        return newState;
      }
      return state;
    default:
      return state;
  }
}
