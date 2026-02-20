import * as readline from "node:readline/promises"

export async function confirm(message: string, initial: boolean = true): Promise<boolean> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const suffix = initial ? "(Y/n)" : "(y/N)"
    const answer = await rl.question(`${message} ${suffix} `)
    rl.close()

    if (!answer) return initial
    return answer.toLowerCase() === "y" || answer.toLowerCase() === "yes"
}
