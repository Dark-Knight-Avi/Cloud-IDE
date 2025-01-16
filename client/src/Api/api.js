export const getFileTree = async () => {
    const response = await fetch('http://localhost:9000/files').then(resp => resp.json())
    return response
  }
