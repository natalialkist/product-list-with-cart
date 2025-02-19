import { useRef, useEffect } from "react";
import orderConfirmedIcon from "../../assets/images/icon-order-confirmed.svg?url"
import "./OrderConfirmationDialog.css"

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
            <div className="dialogContent">
                <img src={orderConfirmedIcon} width='50' height='50' style={{ color: 'green' }} />
                <h1>Order Confirmed</h1>
                    { Object.values(cart).map((item) => (
                        <div key={ item.product.id } className="orderItem">
                            <img src={item.product.image} alt={item.title} width='60' height='60' />
                            <div className="orderItemInfo">
                                <div className="orderItemDescription">
                                    <p>{ item.product.title }</p>
                                    <div style={{ display: 'flex' }}>
                                        <p className="orderItemQuantity">{ item.quantity }x</p>
                                        <p>${ item.product.price }</p>
                                    </div>
                                </div>
                                <p className="orderItemTotalPrice">${(item.quantity * item.product.price).toFixed(2)}</p>
                            </div>
                        </div>  
                    ))} 
                <div className="orderTotal">
                    <p>Order Total</p>
                    <p>${total}</p>
                </div>
                <button className="newOrderButton" onClick={() => {
                    cleanCart({})
                    dialogRef.current?.close(); onClose();
                }}>
                    Start New Order
                </button>
            </div>
        </dialog>
    );
}