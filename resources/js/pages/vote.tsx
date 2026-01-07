interface Props {
    relicEffect: RelicEffect,
}

export default function vote({
    relicEffect
}: Props) {
    return (
        <pre>{JSON.stringify(relicEffect)}</pre>
    )
};
