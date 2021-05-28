const onFinishHasForm = (dispatch, eventStr, lastInsertedAlbum, data, globalData, payloadIdSecond) => {
  const uniqueData = new Set();
  data.map(item => uniqueData.add(item.name));
  const arrUniqueData = [...uniqueData];

  for (let i = 0; i < arrUniqueData.length; i++) {
    dispatch(eventStr, {
      "AlbumId": lastInsertedAlbum,
      [payloadIdSecond]: globalData.find(item => item.value === arrUniqueData[i]).id,
    });
  }
}

export default onFinishHasForm;