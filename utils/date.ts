import {
    format,
    differenceInMinutes,
    differenceInHours,
    differenceInYears,
    isThisWeek,
    isThisYear,
    isToday,
    isYesterday,
} from "date-fns";

export function formatHeaderDate(date: Date): string {
    const now = new Date();

    const minutes = differenceInMinutes(now, date);
    if (minutes < 60) {
        return `${Math.floor(minutes)}m`;
    }

    const hours = differenceInHours(now, date);
    if (hours < 24) {
        return `${Math.floor(hours)}h`;
    }

    const years = differenceInYears(now, date);
    if (years >= 1) {
        return format(date, "MMMM d, yyyy 'at' h:mm a");
    }

    return format(date, "MMMM d 'at' h:mm a");
}

export function formatChatTimestamp(date: Date): string {
    if (isToday(date)) {
        return format(date, "h:mm a");
    }

    if (isYesterday(date)) {
        return "Yesterday";
    }

    if (isThisWeek(date)) {
        return format(date, "EEE");
    }

    if (isThisYear(date)) {
        return format(date, "MMM d");
    }

    return format(date, "MMM d, yyyy");
}
