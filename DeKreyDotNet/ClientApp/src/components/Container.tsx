import React from 'react';

export function Container({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>{children}</div>;
}

export function PaddedContainer({ children, style = {}, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Container style={{ padding: "0.5rem", ...style }} {...props}>
            {children}
        </Container>
    );
}
