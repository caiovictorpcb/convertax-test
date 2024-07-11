interface Props {
  value: number;
  fractionDigits?: number;
  className?: string;
}
export const MoneyText = ({ value, className, fractionDigits = 2 }: Props) => {
  return (
    <span className={className}>
      {value?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: fractionDigits,
      })}
    </span>
  );
};
