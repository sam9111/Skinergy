import { Button } from "@chakra-ui/react"

function CustomButton({ text }) {
  return (
    <Button bgColor="#8b0a50" variant="solid">
      {text}
    </Button>
  )
}

export default CustomButton
