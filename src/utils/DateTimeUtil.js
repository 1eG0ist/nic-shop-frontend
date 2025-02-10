export default class DateTimeUtil {
    /**
     * @param {string} dateString - Строка даты в формате ISO.
     * @param {string} timeZone - Часовой пояс пользователя.
     * @returns {string} - Отформатированная строка с датой и временем.
     */
    static formatDateTime(dateString, timeZone) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: timeZone,
            hour12: false,
        };
        return new Intl.DateTimeFormat('default', options).format(date);
    }

    /**
     * @returns {string} - Часовой пояс пользователя.
     */
    static getUserTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}
