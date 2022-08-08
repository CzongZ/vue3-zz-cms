import { formatUtcString } from '@/utils/date-format'

export const registerProperties = {
  install: (app: any, options: any) => {
    app.config.globalProperties.$filters = {
      formatTime(time: string) {
        return formatUtcString(time)
      }
    }
  }
}

export interface IFilters {
  formatTime: (time: string) => string
}
