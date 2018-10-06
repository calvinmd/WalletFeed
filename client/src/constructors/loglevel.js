import * as log from 'loglevel';

export default function configureLoglevel() {
  const level = process.env.NODE_ENV === 'development' ? log.levels.DEBUG : log.levels.INFO
  const persist = true
  log.setLevel(level, persist)
  log.info(`Setting log level to "${level}"`)
}
