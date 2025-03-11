import Link from 'next/link';
import { RegisterForm } from '@/Components/Forms';
// import { SocialButtons } from '@/components/common';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Full Auth | Register',
	description: 'Full Auth register page',
};

export default function Page() {
	return (
		<div className='min-h-[calc(100vh-64px)] space-y-4 px-6 lg:px-8 bg-white py-12'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<img
					className='mx-auto h-10 w-auto'
					src='/coursatty_high_resolution_logo_black_transparent.png'
					alt='Full Auth'
				/>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign up for your account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<RegisterForm />
				{/* <SocialButtons /> */}

				<p className='mt-10 text-center text-sm text-gray-500'>
					Already have an account?{' '}
					<Link
						href='/auth/login'
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
}