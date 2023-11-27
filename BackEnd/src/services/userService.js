import db from "../models"
import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10)

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })

                if (user) {
                    //compare password
                    let checkPassword = bcrypt.compareSync(password, user.password)
                    if (checkPassword) {
                        userData.errCode = 0
                        userData.errMessage = 'Oke'
                        // console.log(user)
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password'
                    }

                } else {
                    userData.errCode = 2
                    userData.errMessage = `User not found.`
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your email isn't exist in your system.`
                console.log('isExit false');
                console.log(userData)
                resolve(userData)
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let comparePassword = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailIsAlready = await checkUserEmail(data.email)
            if (emailIsAlready === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Email is already, please try another email"
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Oke'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.gender || !data.positionId || !data.roleId) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.gender = data.gender
                user.positionId = data.positionId
                user.roleId = data.roleId
                user.phonenumber = data.phonenumber
                if (data.avatar) {
                    user.image = data.avatar
                }
                await user.save()
                resolve({
                    errCode: 0,
                    errMessage: 'Edit user is successed'
                })
            }
        } catch (e) {
            reject(e)
        }

    })
}

let deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })

        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `User isn't exist`
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            errMessage: 'User is deleted'
        })
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requied paraments !'
                })
            }

            let res = {}
            let allCode = await db.Allcode.findAll({
                where: { type: typeInput }
            })
            res.errCode = 0
            res.data = allCode
            resolve(res)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}