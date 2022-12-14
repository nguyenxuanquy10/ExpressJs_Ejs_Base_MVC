const userService = require("./user.service");
// const Token = require("../models/token.model");
const { User } = require("../models/index");

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */

const loginUserWithEmailAndPassword = async(email, password) => {
    const user = await userService.getUserEmail(email);
    if (!user || !(await user.isMatchPassword(password))) {
        throw new ErrorResponse("Incorrect email or password", httpStatus.UNAUTHORIZED);
    }
    return user;
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */

const loginUserWithUserNameAndPassword = async(username, password) => {
    // const user = await userService.getUserByEmail(email);
    const user = await User.findOne({ username: username });
    if (!user || !(await user.isMatchPassword(password))) {
        throw new ErrorResponse("Incorrect email or password", httpStatus.UNAUTHORIZED);
    }
    return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
// const logout = async(refreshToken) => {
//     const refreshTokenDoc = await Token.findOne({
//         token: refreshToken,
//     });
//     if (!refreshTokenDoc) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Not found");
//     }
//     await refreshTokenDoc.remove();
// };

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
// const refreshAuth = async(refreshToken) => {
//     try {
//         const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
//         const user = await userService.getUserById(refreshTokenDoc.user);
//         if (!user) {
//             throw new Error();
//         }
//         await refreshTokenDoc.remove();
//         return tokenService.generateAuthTokens(user);
//     } catch (error) {
//         throw new ErrorResponse("Please authenticate", httpStatus.UNAUTHORIZED);
//     }
// };

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
// const resetPassword = async(resetPasswordToken, newPassword) => {
//     try {
//         const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
//         console.log(resetPasswordTokenDoc.user);
//         const user = await userService.getUserById(resetPasswordTokenDoc.user);
//         if (!user) {
//             throw new Error();
//         }
//         await userService.updateUserById(user.id, { password: newPassword });
//         await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
//     } catch (error) {
//         console.log(error);
//         throw new ErrorResponse("Password reset failed", httpStatus.UNAUTHORIZED);
//     }
// };

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
// const verifyEmail = async(verifyEmailToken) => {
//     try {
//         const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
//         const user = await userService.getUserById(verifyEmailTokenDoc.user);
//         if (!user) {
//             throw new Error();
//         }
//         await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
//         await userService.updateUserById(user.id, { isEmailVerified: true });
//     } catch (error) {
//         throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
//     }
// };

module.exports = {
    loginUserWithEmailAndPassword,
    loginUserWithUserNameAndPassword,
    // logout,
    // refreshAuth,
    // resetPassword,
    // verifyEmail,
};