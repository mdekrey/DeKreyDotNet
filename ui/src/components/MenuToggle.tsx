import {
	type OpenMobileMenu,
	useMobileMenuState,
} from '@/core/mobile-menu-state';
import { twMerge } from 'tailwind-merge';

const MenuToggle = ({
	mobileMenu,
	children,
}: {
	mobileMenu: OpenMobileMenu;
	children?: React.ReactNode;
}) => {
	const [currentMobileMenu, setMobileMenu] = useMobileMenuState();

	const isActive = currentMobileMenu === mobileMenu;

	return (
		<button
			className={twMerge(
				'border rounded-md border-transparent bg-transparent p-2 md:hidden',
				isActive && 'border-slate-500 bg-slate-200',
			)}
			type="button"
			aria-pressed={isActive ? 'true' : 'false'}
			onClick={toggleMenu}
		>
			{children}
		</button>
	);

	function toggleMenu() {
		console.log('toggle menu', isActive ? null : mobileMenu);
		setMobileMenu(isActive ? null : mobileMenu);
	}
};

export default MenuToggle;
