export const required = (value) => {
    if (!value) {
        return 'Required'
    }
    return undefined
};

export const validEmail = (email)=>{
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return "Invalid email address";
    }
    return undefined;
}
