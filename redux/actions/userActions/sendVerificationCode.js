import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const sendVerificationCode = (codeInformation) => {
    const {userId, otaCode} = codeInformation;
    let url = `${baseUrl}users/check-code-verification`;
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            ota_code: otaCode,
        }),
    };
    return async dispatch => {
        dispatch({type: "VERIFYING_CODE"});
        return async dispatch => {
            setTimeout(() => {
                fetch(url, options)
                    .then(res => res.json())
                    .then(data => {
                        let {success} = data;
                        if (success === true) {
                            return dispatch({type: "CODE_VERIFICATION_SUCCESS"});
                        } else {
                            let {error} = data;
                            let {message} = error;
                            return dispatch({type: "CODE_VERIFICATION_ERROR", message});
                        }
                    })
            }, 1000)
        }
    }
}

export default sendVerificationCode;