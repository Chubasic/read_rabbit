// import type { Dispatch, StateUpdater } from "preact/hooks";
import Button from "../../Button.tsx";

type Props = {
	// toggle: Dispatch<StateUpdater<boolean>>;
};

const ReaderToolobar = ({ }: Props) => {
    return (
        <div className="rounded flex items-center justify-between border-b-2 border-(--gray-light) bg-(--accent)">
            <Button
                type="button"
                className="m-2 rounded-full"
          onClick={() => {
            // readerToggle((prevState) => !prevState)
          }}
            >
                <svg
                    width="28px"
                    height="28px"
                    viewBox="0 -2 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                        <title>focus_horizontal_round_round [#840]</title> <desc>circle</desc> <defs></defs>
                        <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                        >
                            <g
                                id="Dribbble-Light-Preview"
                                transform="translate(-60.000000, -4481.000000)"
                                fill="#000000"
                            >
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path
                                        d="M22,4335 L22,4333 C22,4332.448 21.552,4332 21,4332 L21,4332 C20.448,4332 20,4332.448 20,4333 L20,4334 C20,4334.552 19.552,4335 19,4335 L18,4335 C17.448,4335 17,4335.448 17,4336 C17,4336.552 17.448,4337 18,4337 L20,4337 C21.105,4337 22,4336.105 22,4335 M20,4321 L18,4321 C17.448,4321 17,4321.448 17,4322 C17,4322.552 17.448,4323 18,4323 L19,4323 C19.552,4323 20,4323.448 20,4324 L20,4325 C20,4325.552 20.448,4326 21,4326 L21,4326 C21.552,4326 22,4325.552 22,4325 L22,4323 C22,4321.895 21.105,4321 20,4321 M8,4337 L10,4337 C10.552,4337 11,4336.552 11,4336 C11,4335.448 10.552,4335 10,4335 L9,4335 C8.448,4335 8,4334.552 8,4334 L8,4333 C8,4332.448 7.552,4332 7,4332 L7,4332 C6.448,4332 6,4332.448 6,4333 L6,4335 C6,4336.105 6.895,4337 8,4337 M7,4326 L7,4326 C7.552,4326 8,4325.552 8,4325 L8,4324 C8,4323.448 8.448,4323 9,4323 L10,4323 C10.552,4323 11,4322.552 11,4322 C11,4321.448 10.552,4321 10,4321 L8,4321 C6.895,4321 6,4321.895 6,4323 L6,4325 C6,4325.552 6.448,4326 7,4326 M4,4329 L4,4329 C4,4328.448 4.448,4328 5,4328 L23,4328 C23.552,4328 24,4328.448 24,4329 C24,4329.552 23.552,4330 23,4330 L5,4330 C4.448,4330 4,4329.552 4,4329"
                                        id="focus_horizontal_round_round-[#840]"
                                    ></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </Button>

            <Button
                type="button"
                className="m-2 rounded-full"
            >
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: Well I dont want to deal with it rn */}
                <svg width="28px" height="28px" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        cx="14"
                        cy="14"
                        r="12"
                        fill="none"
                        stroke="#000000"
                        stroke-width="4"
                        stroke-dasharray="56.5 18.85"
                        stroke-dashoffset="0"
                    />
                </svg>
            </Button>
        </div>
    );
};
export default ReaderToolobar;
