import { useRef, useEffect } from "react";
import orderConfirmedIcon from "../../assets/images/icon-order-confirmed.svg?url"
import "../App.css"

export default function OrderConfirmationDialog({ cart, cleanCart, isOpen, onClose, total }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (dialog) {
            if (isOpen) {
                dialog.showModal();
            } else {
                dialog.close();
            }
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className="dialog">
            <div className="dialog-content">
                <img src={orderConfirmedIcon} width='50' height='50' style={{ color: 'green'}} />
                <h1 style={{ marginBottom: '30px', marginTop: '10px' }}>Order Confirmed</h1>
                    { Object.values(cart).map((item) => (
                        <div key={ item.product.id } className="order-item">
                            <img src={item.product.image} alt={item.title} width='60' height='60' />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '10px', width: '85%'}}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p>{ item.product.title }</p>
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ color: '#c83b0e', marginRight: '15px' }}>{ item.quantity }x</p>
                                        <p>${ item.product.price }</p>
                                    </div>
                                </div>
                                <p style={{ fontWeight: '600' }}>${(item.quantity * item.product.price).toFixed(2)}</p>
                            </div>
                        </div>  
                    ))} 
                <div className="order-total">
                    <p>Order Total</p>
                    <p>${total}</p>
                </div>
                <button className="confirm-button" onClick={() => {
                    cleanCart({})
                    dialogRef.current?.close(); onClose();
                }}>
                    Start New Order
                </button>
            </div>
        </dialog>
    );
}