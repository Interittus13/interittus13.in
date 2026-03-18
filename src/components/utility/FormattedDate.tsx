import { FC, ReactNode } from "react";
import { CONFIG } from "@/src/config/blog";
import Moment from "react-moment";

interface FormattedDateProps {
    date: string | Date;
    className?: string
    format?: string
    fromNow?: boolean
    children?: ReactNode
}

const DEFAULT_FORMAT = CONFIG.DATE_FORMAT || 'DD MM YYYY'

const FormattedDate: FC<FormattedDateProps> = ({
    date,
    className = 'block mt-2 text-sm font-semibold text-true-gray-600 dark:text-true-gray-400',
    format = DEFAULT_FORMAT,
    fromNow = false,
    children
}) => {
    if (!date || isNaN(new Date(date).getTime())) {
        return <span className={className ?? "Invalid date"}></span>
    }

    return (
        <Moment
            className={className}
            date={date}
            {...(fromNow ? { fromNow: true } : { format })}
            local
        />
    )
}

export default FormattedDate