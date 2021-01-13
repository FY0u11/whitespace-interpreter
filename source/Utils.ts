export class Utils {
    static getRandomInt (min: number, max: number): number {
        return ~~(Math.random() * (max - min) + min)
    }

    static encodeNumber (number: number): string {
        let encodedNumber = number.toString(2)
            .replace(/1/g, '\t')
            .replace(/0/g, ' ')
            .replace('-', '\t')
        return number > 0 ? ' ' + encodedNumber : encodedNumber
    }

    static getSourceCodeForPushingNNumbersIntoTheStack (...args: number[]): string {
        if (args.length) {
            return args.reduce((sourceCode, arg) => sourceCode + `  ${Utils.encodeNumber(arg)}\n`, '')
        } else return '   \n   \t\n'
    }
}
