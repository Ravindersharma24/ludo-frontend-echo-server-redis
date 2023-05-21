export const parseInJSON = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}

export const getNested = (obj, ...args) => {
    return args.reduce((obj, level) => obj && obj[level], obj)
  }
  
