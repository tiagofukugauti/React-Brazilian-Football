// prettier-ignore
const WITH_SPECIAL_CHARACTERS =
  'áãâäàÁÃÂÄÀéêëèÉÊËÈíîïìÍÎÏÌóõôöòÓÕÔÖÒúûüùÚÛÜÙñÑçÇ'.split('');

// prettier-ignore
const WITHOUT_SPECIAL_CHARACTERS =
  'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuUUUUnNcC'.split('');

export function helperGetImageNameFrom(value) {
  const imageName =
    value
      .toString()
      .toLowerCase()
      .split('')
      .map(char => {
        const index = WITH_SPECIAL_CHARACTERS.indexOf(char)
        return index < 0 ? char : WITHOUT_SPECIAL_CHARACTERS[index]
      })
      .join('')
      .split(' ')
      .join('_') + '.png'

  return imageName
}
