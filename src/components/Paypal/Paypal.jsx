import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Paypal({ onSuccess }) {
	const paypal = useRef();

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, error) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								description: 'BUS_EXPRESS',
								amount: {
									current_code: 'USD',
									value: 4000.0,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					if (onSuccess) {
						await onSuccess(true);
					}
					console.log('successful order' + order);
				},
				onError: (err) => {
					console.log(err);
				},
			})
			.render(paypal.current);
	}, []);

	return <div ref={paypal}></div>;
}

export default Paypal;
