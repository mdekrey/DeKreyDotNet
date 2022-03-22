import classNames from 'classnames';

export default function FigCaption({ className, ...props}: JSX.IntrinsicElements['figcaption']) {
    return <figcaption {...props} className={classNames("text-xs text-gray-600 flex justify-center", className)} />;
}
