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
                <img src={orderConfirmedIcon} width='32' height='32' style={{ color: 'green'}} />
                <h1>Order Confirmed</h1>
                <p>We hope you enjoy your food!</p>
                { Object.values(cart).map((item) => (
                    <>
                        <div key={ item.product.id } className="cartItem">
                            <img src={item.image} alt={item.title} />
                            <p>{ item.product.title }</p>
                            <p>{ item.product.price }</p>
                            <p>{ item.quantity }</p>
                        </div>
                    </>     
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Order Total</p>
                    <p style={{ fontWeight: '600', fontSize: '20px '}}>${total}</p>
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