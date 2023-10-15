import React from 'react';
import {cn} from "@/lib/utils";

function MaxWidthWrapper({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={"min-w-screen min-h-screen max-h-screen bg-secondary flex justify-center "}>
            <div className={cn("w-full max-w-screen-xl", className)}>
                {children}
            </div>
        </div>
    );
}

export default MaxWidthWrapper;