export const validatePhone = (phone: any) => {
    const valid = /^([0-9]{10}$)/.test(phone)
    return valid
}
