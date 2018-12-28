import React from 'react';

import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import CreateComponentsFromMetadata from '../../general/CreateComponentsFromMetadata';

export default () => (
	<Card
		title="Synaptic gains"
		subtitle="Scale synaptic gains by group"
	>
		<div className="Card">
			<div>
				<Thumbnail 
					selected="Gains"
					names={["Gains"]}
					handleClick={() => {}}
				/>
			</div>
			<div>
				<CreateComponentsFromMetadata {...metadata.synapticGain} />
			</div>
		</div>
	</Card>
);
