import bcrypt from "bcryptjs"
import db from "../models"


const salt = bcrypt.genSaltSync(10)

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
            console.log(e)
            reject(e)
        }
    })
}

let createNewUser = async (data) => {
    console.log("test")
    return new Promise(async (resolve, reject) => {
        try {
            let emailIsAlready = await checkUserEmail(data.email)
            if (emailIsAlready === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Email is already, please try another email."
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
                    gender: data.gender === 1 ? true : false,
                    roleId: data.roleId
                })
            }
            resolve("Oke create a new user succeed")
        } catch (e) {
            reject(e)
        }
    })
}

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

let getAllUser = () => {
    return new Promise((resolve, reject) => {
        try {
            let user = db.User.findAll({
                raw: true,
            });
            resolve(user)
        } catch (e) {
            reject(e)
        }
    })
}


let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()
                let allUser = db.User.findAll()
                resolve(allUser)
            } else {
                resolve()
            }
        } catch (e) {
            console.log(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await user.destroy()
            }

            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}