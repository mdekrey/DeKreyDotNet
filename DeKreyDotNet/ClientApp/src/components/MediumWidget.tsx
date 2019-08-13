import React from 'react';
import { v4 } from "uuid";
import "./MediumWidget.css";

export function MediumWidget({ url, ...props }: { url: string } & React.HTMLAttributes<HTMLDivElement>) {
    const widgetId = React.useMemo(() => '_' + v4(), [url]);

    React.useEffect(() => {
        (window as any).MediumWidget.Init({
            renderTo: '#' + widgetId,
            params: { "resource": url, "postsPerLine": 3, "limit": 6, "picture": "big", "fields": ["description", "author", "claps", "publishAt"], "ratio": "landscape" }
        }, widgetId);
    }, [url, widgetId]);

    return <div style={{ margin: "0 15px" }} {...props} id={widgetId} />
}
