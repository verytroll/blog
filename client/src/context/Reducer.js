
export default function Reducer(state, action) {
    let result;

    switch(action.type) {
        case "LOGIN_START":
        {
            result = {
                user: null,
                isFetching: true,
                error: false,
            };
        } break;

        case "LOGIN_SUCCESS":
        {
            result = {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        } break;

        case "LOGIN_FAILURE":
        {
            result = {
                user: null,
                isFetching: false,
                error: true,
            };
        } break;

        case "LOGOUT":
        {
            result = {
                user: null,
                isFetching: false,
                error: false,
            };
        } break;

        case "UPDATE_START":
        {
            result = {
                ...state,
                isFetching: true,
            };
        } break;

        case "UPDATE_SUCCESS":
        {
            result = {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        } break;

        case "UPDATE_FAILURE":
        {
            result = {
                user: state.user,
                isFetching: false,
                error: true,
            };
        } break;

        default:
        {
            result = state;
        }
    }

    return(result);
}
