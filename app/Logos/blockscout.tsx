import Image from "next/image";

function BlockscoutLogo({ width = 24, height = 24, classNames = "" }) {
  return (
    <Image
      alt="Blockscout Logo"
      width={width}
      height={height}
      className={classNames}
      src="data:image/png;base64,AAAAGGZ0eXBhdmlmAAAAAG1pZjFtaWFmAAAA0m1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHBpY3QAAAAAAAAAAAAAAAAAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAAA8gAAAdIAAAAjaWluZgAAAAAAAQAAABVpbmZlAgAAAAABAABhdjAxAAAAAFZpcHJwAAAAOGlwY28AAAAUaXNwZQAAAAAAAABIAAAASAAAAAxhdjFDgT9AAAAAABBwaXhpAAAAAAMKCgoAAAAWaXBtYQAAAAAAAAABAAEDAYIDAAAB2m1kYXQSAAoJP9mjxy8BDQbQMsIDZGWM0EnE/z+gD9QH/AIKAQeAAAAAV7oQAggioPYKM7z4001I4K/r/HJ4hAiznUtE5JaG0y9g23uM3GwpeLHhS9e3dU/PQ783qUNxeXU/brdT3oLE9Px1n3R3x/Dz7F+MJfksgEZQzXeEw0469uT/JXSd9Hsc0CsF9VUS8mTcUPppn8g5KuCYikf3nHTlzzq30mfo9YyuNL0H0bCXz+ECNPQwGOrhtvcnISRAWWgrDX/RanUxUEP0VJXP4LdOrAWLMjDtngy3q/jT0oRc7M1EV5e2/pGhTqmSrwmiK9xbpz/FtpuqKM/kl3Z8oOqWk4puMMntTf8YnHPi3jvNO3PZDFvYIxVW693XNRhfj+wVsFVO2PUAlgxbbMale7vg21uBfP6c1S5tqJJBzwLAMh0pbj/Oi+Z0aKPoirKNo3yFzasZQsym4nHo+9i6LOoU8rlFU0RATgqQZMqFrtfzmcjAr6YUw0sX3mdO79J3ykcxFALK1koNSl3gx3XF1xbPba8xFd4ia0UeNrY44SmvYPzf+YBAEc349CRbpru+h6GuJnb96dPAjdmKB5WnW8gwLNBfyP+E0k/ugPUcarQlnlq3Vs84"
    />
  );
}

export default BlockscoutLogo;