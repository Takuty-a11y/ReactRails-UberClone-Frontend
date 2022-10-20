import { DialogContent, Dialog, DialogTitle } from "@material-ui/core";
import { FC } from "react";
import { OrderButton } from "./Button/OrderButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  existingResutaurautName: string; // 他店舗の名前
  newResutaurautName: string; // いま選択した店舗の名前
  onClickSubmit: () => void; // 仮注文の置き換えAPIを呼ぶ
};

export const NewOrderConfirmDialog: FC<Props> = (props) => {
  const {
    isOpen,
    onClose,
    existingResutaurautName,
    newResutaurautName,
    onClickSubmit,
  } = props;
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogTitle>新規注文を開始しますか？</DialogTitle>
      <DialogContent>
        <p>
          {`ご注文に ${existingResutaurautName} の商品が含まれています。
            新規の注文を開始して ${newResutaurautName} の商品を追加してください。`}
        </p>
        {/* 先ほど作ったOrderButtonをここで使用 */}
        <OrderButton onClick={onClickSubmit}>新規注文</OrderButton>
      </DialogContent>
    </Dialog>
  );
};
