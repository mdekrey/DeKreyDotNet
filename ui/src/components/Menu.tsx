import {
	type OpenMobileMenu,
	useMobileMenuState,
} from '@/core/mobile-menu-state';
import { twMerge } from 'tailwind-merge';

const Menu = ({
	mobileMenu,
	className,
	openClass,
	closedClass,
	children,
}: {
	mobileMenu: OpenMobileMenu;
	className: string;
	openClass?: string;
	closedClass?: string;
	children?: React.ReactNode;
}) => {
	const [currentMobileMenu] = useMobileMenuState();

	const isActive = currentMobileMenu === mobileMenu;

	return (
		<nav
			className={twMerge(
				className,
				isActive && openClass,
				!isActive && closedClass,
			)}
		>
			{children}
		</nav>
	);
};

export default Menu;
