import {exec} from 'child_process'
import {promises as fs} from 'fs'
import {promisify} from 'util'

async function exists(path: string) {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

const execAsync = promisify(exec)

type Manager = 'npm' | 'yarn'

const usingYarn = () => exists('./yarn.lock')

export async function justInstall(args: string[]) {
  const passThroughArgs = args.slice(2)

  let mgr: Manager
  const usingYarn = await exists('./yarn.lock')
  if (usingYarn) {
    mgr = 'yarn'
  } else {
    mgr = 'npm'
  }

  let cmd = 'install'
  if (passThroughArgs.length > 0) {
    if (usingYarn) {
      cmd = 'add'
    }
  } else {
    cmd = 'install'
  }

  const argsString = passThroughArgs.join(' ')
  console.log('just-install')

  console.log(mgr, argsString)
  try {
    const {stdout, stderr} = await execAsync([mgr, cmd, argsString].join(' '))
    if (stderr) {
      console.error(stderr)
    } else {
      console.log(stdout)
    }
  } catch (error) {
    console.error(error)
  }
}
