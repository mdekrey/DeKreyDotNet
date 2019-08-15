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

export function CardContainer({ children, style = {}, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <PaddedContainer style={{ border: "1px solid #ccc", boxShadow: "0.1rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)", ...style }} {...props}>
            {children}
        </PaddedContainer>
    );
}

export function Card({ children, style = {}, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div style={{ border: "1px solid #ccc", boxShadow: "0.1rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)", ...style }} {...props}>
            {children}
        </div>
    );
}