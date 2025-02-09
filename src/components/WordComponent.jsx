/* eslint-disable react/prop-types */
export function WordComponent({children,wordStatus}){
    return (
        <div
          className={`word ${wordStatus || ""}`}
        >
          {children}
        </div>
      );
}