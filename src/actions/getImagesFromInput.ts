import WFWorkflowAction from '../interfaces/WF/WFWorkflowAction';

/**
 * @action Get Images from Input
 * @section Content Types > Photos & Video > Images
 * @icon Image
 *
 * Gets images from the result of the previous action. For example, this action can get the album art of a song, or all the images on a web page.
 *
 * ```js
 * getImagesFromInput();
 * ```
 */

const getImagesFromInput = (): WFWorkflowAction => ({
  WFWorkflowActionIdentifier: 'is.workflow.actions.detect.images',
  WFWorkflowActionParameters: {},
});

export default getImagesFromInput;
