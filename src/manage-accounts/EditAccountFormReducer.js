export default function(state, action) {
  switch (action.type) {
    case 'redux-form/CHANGE':
      if (action.field === 'accountType' && action.form === 'EditAccount') {
        const newState = Object.assign({}, state);
        // reset accountCompany value when changing accountType value
        // since both bank and credit cards use accountCompany
        newState[action.key].accountCompany.value = '';
        return newState;
      }
      return state;
    default:
      return state;
  }
}
