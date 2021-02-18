import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import Banner from './Banner/banner';

export default function Home() {
	return (
		<div>
			<Box>
				<Banner />
			</Box>
			
		</div>
	);
}
