import { ColorContext } from 'src/context/colorMain';

import { paymentLogos } from './form-steps';

const { styled } = require('@mui/material');
const { useRef, useEffect, useContext } = require('react');

const PaymentFormContainer = styled('div')({
  position: 'relative',
  height: 0,
  paddingBottom: '56.25%', // Adjust aspect ratio based on payment form dimensions
  overflow: 'hidden',
});

const PaymentFormIframe = styled('iframe')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 0,
});

const testUrl =
  'https://icom.yaad.net/p/?action=pay&Amount=10&ClientLName=Isareli&ClientName=Israel&Coin=1&FixTash=False&Info=test-api&J5=False&Masof=0010131918&MoreData=True&Order=12345678910&PageLang=HEB&Postpone=False&Pritim=True&SendHesh=True&ShowEngTashText=False&Sign=True&Tash=2&UTF8=True&UTF8out=True&UserId=203269535&action=pay&cell=050555555555&city=netanya&email=test%40yaad.net&heshDesc=%5B0~Item%201~1~8%5D%5B0~Item%202~2~1%5D&phone=098610338&sendemail=True&street=levanon%203&tmp=1&zip=42361&signature=908f05b9905e64bed97f3fbdb800151cb175069b5053bfda55d48d716db441c8';

function PaymentForm({ paymentUrl, ...props }) {
  const paymentFormRef = useRef(null);
  const { mode } = useContext(ColorContext);

  useEffect(() => {
    if (paymentFormRef.current) {
      paymentFormRef.current.src = paymentUrl;
    }
  }, [paymentUrl]);

  return (
    <div>
      <PaymentFormContainer>
        <PaymentFormIframe title="Payment Form" ref={paymentFormRef} />
      </PaymentFormContainer>
      <div className="mt-4">{paymentLogos(mode)}</div>
    </div>
  );
}

export default PaymentForm;
